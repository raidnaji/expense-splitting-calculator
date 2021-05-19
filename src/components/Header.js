import { Fragment, useState } from 'react';
import { MdHelp } from 'react-icons/md'
import { MdClose } from 'react-icons/md'



const Header = () => {

    const [isActive, setActive] = useState(false);

    const handleHeaderIconClick = () => {
        setActive(!isActive);
    }

    return (
        <Fragment>
            <header>
                <h1>Expense Splitting Calculator
                </h1>

                <button
                    onClick={handleHeaderIconClick}
                    className={`headerButton ${isActive ? "noDisplay" : ""}`}>
                    <MdHelp />
                </button>


                <div
                    className={`infoBox ${isActive ? "" : "noDisplay"}`}
                    onClick={handleHeaderIconClick}>

                    <MdClose className="infoBoxButton" />

                    <h3>How are your expenses being divided?</h3>

                    <p className="infoBoxText">The amount you and your partner owe for shared expenses are proportional to the total income you each contribute to your household.</p>

                </div>
            </header>
        </Fragment>
    )
}

export default Header;