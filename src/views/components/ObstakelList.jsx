import PropTypes from "prop-types";
import React from 'react';
import Obstakel from './Obstakel';

const ObstakelList = ({ obstakelList }) => {
    return (
        <tr className="ObstakelList">
            <td colSpan="4">
                {
                    obstakelList.map((obstakel, i) => {
                        return (
                            <Obstakel key={i} obstakel={obstakel}/>
                        );
                    })
                }
            </td>
        </tr>
    );
};

ObstakelList.propTypes = {
  obstakelList: PropTypes.object
};

module.exports = ObstakelList;
