import React from 'react'
import {ListGroup,ListGroupItem} from 'reactstrap'

const PollList=({polls,selectPoll})=>{
     if(polls.length===0){
         return <p>There is no list</p>
     }

     return(
         <ListGroup>
             {polls.map(poll=>(
                 <ListGroupItem key={poll.id} style={{cursor:'pointer'}} onClick={()=>selectPoll(poll.id)}>
                     {poll.title.length>30 ? poll.title.substr(0,30) + '...': poll.title}
                 </ListGroupItem>
             ))}
         </ListGroup>
     );
}

export default PollList;