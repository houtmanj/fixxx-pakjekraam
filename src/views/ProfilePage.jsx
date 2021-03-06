const Content = require('./components/Content');
const React = require('react');
const Page = require('./components/Page.jsx');
const PropTypes = require('prop-types');
const OndernemerProfile = require('./components/OndernemerProfile.jsx');
const MarktmeesterProfile = require('./components/MarktmeesterProfile.jsx');
const Header = require('./components/Header');

const today = () => new Date().toISOString().replace(/T.+/, '');

class ProfilePage extends React.Component {
    propTypes = {
        ondernemer: PropTypes.object,
        user: PropTypes.object.isRequired,
        messages: PropTypes.array,
    };

    render(state) {
        return (
            <Page messages={this.props.messages}>
                <Header user={this.props.user} />
                <Content>
                    <OndernemerProfile user={this.props.user} ondernemer={this.props.ondernemer} />
                    <p>
                        <a href="/logout">Uitloggen</a>
                    </p>
                </Content>
            </Page>
        );
    }
}

module.exports = ProfilePage;
