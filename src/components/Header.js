import { Fragment, useState } from 'react';
import { BsQuestionCircle } from 'react-icons/bs'


const Header = () => {

    const [isActive, setActive] = useState(false);

    const handleHeaderIconClick = () => {
        setActive(!isActive);
    }

    return (
        <Fragment>
            <header>
                <h1>Expense Splitting Calculator
                    <button
                        onClick={handleHeaderIconClick}
                        className={`headerButton ${isActive ? "noDisplay" : ""}`}>
                        <BsQuestionCircle />
                    </button>
                </h1>


                <div
                    className={`infoBox ${isActive ? "" : "noDisplay"}`}
                    onClick={handleHeaderIconClick}>

                    <h3>How are your expenses being divided?</h3>

                    <p className="infoBoxText">The amount you and your partner owe for shared expenses are proportional to the total income you each contribute to your household.</p>

                </div>
            </header>
        </Fragment>
    )
}

export default Header;