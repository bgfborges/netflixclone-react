import './styles.css';

const Header = ({ black }) => {
    return(
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/200px-Netflix_2015_logo.svg.png" alt="Netflix Logo" />
                </a>
            </div>
            <div className="header--profile">
                <img src="https://i.pinimg.com/originals/1b/71/b8/1b71b85dd741ad27bffa5c834a7ed797.png" alt="Netflix Logo" />
            </div>
        </header>
    );
}

export { Header };