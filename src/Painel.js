import './Painel.css';
import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {v4 as uuid} from 'uuid';


// criando os leads de exemplo
const itemsFromBackend = [
  { id: uuid(), content: "Lead1", Telefone: "2093281490790", Email: "sahiu@usadh" },
  { id: uuid(), content: "Lead2", Telefone: "2093281490790", Email: "sahiu@usadh" },
  { id: uuid(), content: "Lead3", Telefone: "2093281490790", Email: "sahiu@usadh" },
  { id: uuid(), content: "Lead4", Telefone: "2093281490790", Email: "sahiu@usadh" },
];
window.localStorage.setItem('Leads',JSON.stringify(itemsFromBackend));

// criando as colunas
const columnsFromBackend = {
  [uuid()]: {
    name: "Clientes em potencial",
    items: itemsFromBackend,
    idDaColuna: 1
  },
  [uuid()]: {
    name: "Dados Confirmados",
    items: [],
    idDaColuna: 2
  },
  [uuid()]: {
    name: "Reunião Agendada",
    items: [],
    idDaColuna: 3
  },
  
};

// Quando o item é solto defini o que é feito com ele
const onDragEnd = (result, taskColumns, setTaskColumns) => {
  //console.log(source.droppableId);
  //console.log(destination.droppableId);
  //checa se tem um destino e se não tiver define a origem como destino
  if (!result.destination){
     console.log("jogou o card no nada"); return;
  }
  const { source, destination } = result;
  
  if (source.droppableId !== destination.droppableId && taskColumns[source.droppableId].idDaColuna + 1 === taskColumns[destination.droppableId].idDaColuna) {
    const sourceColumn = taskColumns[source.droppableId];
    //console.log(taskColumns[source.droppableId]);
    const destColumn = taskColumns[destination.droppableId];
    console.log(taskColumns[destination.droppableId]);
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setTaskColumns({
      ...taskColumns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = taskColumns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setTaskColumns({
      ...taskColumns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};
function Painel() {
  const [taskColumns, setTaskColumns] = useState(columnsFromBackend);
  return (
      
    <div className="context-wrapper">
      <Button variant="contained">Criar Lead</Button>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, taskColumns, setTaskColumns)}
      >
        {Object.entries(taskColumns).map(([columnId, column], index) => {
          
          return (
            <div className="column-wrap" key={columnId}>
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId} >
                  {(provided, snapshot) => {
                    return (
                      <div className="dropbox"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "#eee"
                            : "#ddd"
                          
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div className="dragbox"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      
                                      backgroundColor: snapshot.isDragging
                                        ? "#929292"
                                        : "#454545",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
    
    );
}
export default Painel;