import React, {Component} from 'react'; //esto me deja crear mi propio componente
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap'; //sirve para nuestro menu

class Menu extends Component{
// Todas las cosas se le pasan a los childs como props
    constructor(props) {
        super (props); //required whenever we create component

        this.state = { 
            selectedDish: null //nothing is selected
        }

        console.log('Menu constructor invoked')
    }

    onDishSelect(dish) {
        this.setState({ selectedDish: dish}) //mirar la manera de setear state
    }

    renderDish(dish) {
        if(dish != null) {
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText> {dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else {
            return(
                //empty div no hace nada
                <div></div>
            )
        }
    }

    render(){ //required
        console.log('render invoked')
        const menu = this.props.dishes.map((dish) => { //si lo defino dentro de state haces this.state, si lo recibo uso this.props
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    {/* mt-5= give a margin of 5 units */}
                    {/* ver manera de como implementar on click */}
                    <Card onClick={()=> this.onDishSelect(dish)}>  
                        <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return ( 
            <div className="container">
                <div className="row">
                    {menu}
                    {/* hago variables que defino en JS */}
                </div>
                <div className="row">
                    {this.renderDish(this.state.selectedDish)}
                </div>
            </div>
        );
    }

}

export default Menu; //para que lo podamos usar en cualquier lado