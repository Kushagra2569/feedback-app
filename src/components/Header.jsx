import PropTypes from 'prop-types';

function Header(props) {
    const HeaderStyle = {
        backgroundColor: 'rgba(0,0,0,0.4)',
        color: '#ff6a95',
    };
    return (
        <header style={HeaderStyle}>
            <div className='container'>
                <h2>{props.text}</h2>
            </div>
        </header>
    )
}

Header.defaultProps = {
    text: 'Feedback UI',
}

Header.propTypes = {
    text: PropTypes.string,
}


export default Header
