const ProfilePhoto = require('./ProfilePhoto');
const PropTypes = require('prop-types');
const React = require('react');
const { formatOndernemerName } = require('../../domain-knowledge.js');

const OndernemerProfileHeader = ({ user, inline }) => {
    return (
        <header className={`OndernemerProfileHeader ${inline ? 'OndernemerProfileHeader--inline' : null}`}>
            <div className="OndernemerProfileHeader__profile-photo">
                <ProfilePhoto imageUrlSet={[user.fotoUrl, user.fotoMediumUrl]} />
            </div>
            <div className="OndernemerProfileHeader__text-wrapper">
                <strong className="OndernemerProfileHeader__name">{formatOndernemerName(user)}</strong>
                <span className="OndernemerProfileHeader__id">
                    <span className="OndernemerProfileHeader__id-label">registratienummer: </span>
                    <strong className="OndernemerProfileHeader__id-value">{user.erkenningsnummer}</strong>
                </span>

            </div>
        </header>
    );
};

OndernemerProfileHeader.propTypes = {
    user: PropTypes.object.isRequired,
    inline: PropTypes.bool,
};

module.exports = OndernemerProfileHeader;
