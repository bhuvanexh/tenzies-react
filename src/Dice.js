import React from 'react'

export default function Dice(props) {
    const styles = {
        backgroundColor: props.obj.held ? '#59E391' : '#FFFFFF'
    }


    return (
        <h1 className='dice' style={styles}
            onClick={() => { props.holdDice(props.obj.id) }}
        >
            {props.obj.value}
        </h1>
    )
}