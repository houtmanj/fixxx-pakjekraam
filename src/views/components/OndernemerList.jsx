import PropTypes from 'prop-types';
import React from 'react';
const today = () => new Date().toISOString().replace(/T.+/, '');

const OndernemerList = ({ ondernemers, markt }) => {
    return (
        <div>
            <ul className="LinkList">
                {ondernemers.map(ondernemer => (
                    <li key={ondernemer.koopman.erkenningsnummer} className="LinkList__item">
                        <a href="/" className="Link">
                            {ondernemer.koopman.achternaam}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

OndernemerList.propTypes = {
    ondernemers: PropTypes.arrayOf(PropTypes.object),
    markt: PropTypes.object,
};

module.exports = OndernemerList;