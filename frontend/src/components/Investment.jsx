import React from 'react'
import {Button, Card, Col} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const Investment = ({
    id, 
    title,
    description,
    date,
    discordLink,
    twitterLink,
    strategy,
    handleRemoveInvestment
}) => {
    console.log(id);
    const {Body, Title} = Card;
    const navigate = useNavigate();
    return (

        <Card  className="investment">
            <Body>
                <Title className="investment-title"> {title} </Title>
                <div className="investment-details">
                    <div>{date}</div>
                    <div> {description}</div>
                    <div><a href={discordLink}>Discord</a></div>
                    <div><a href={twitterLink}>Twitter</a></div>

                    <div>{strategy}</div>
                </div> 
                <Button variant="primary" onClick={() => navigate(`/edit/${id}`)}>Edit</Button> {' '}
                <Button variant="danger" onClick={()=> {
                    handleRemoveInvestment(id)
                }}>Delete</Button>
            </Body>
        </Card>

      
    )
}

export default Investment;

