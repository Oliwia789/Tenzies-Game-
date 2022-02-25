
function Die(props) {
    const styles = {
        backgroundColor: props.held ? "#59E391" : "white"
    }
    return (
        <div className="die_section" style={styles} onClick={props.holdDice}>
            <div>{props.value}</div>
        </div>
    )
}

export default Die