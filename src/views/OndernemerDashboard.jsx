const React = require('react');
const Page = require('./components/Page.jsx');
const PropTypes = require('prop-types');
const MainNavigation = require('./components/MainNavigation.jsx');
const Header = require('./components/Header');
const Content = require('./components/Content');
const MarktList = require('./components/MarktList');
const OndernemerAanwezigheid = require('./components/OndernemerAanwezigheid');
const OndernemerProfileHeader = require('./components/OndernemerProfileHeader');

class OndernemerDashboard extends React.Component {
    propTypes = {
        ondernemer: PropTypes.object,
        aanmeldingen: PropTypes.array,
        markten: PropTypes.array,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        user: PropTypes.object,
    };

    render() {
        const { ondernemer, user, markten, aanmeldingen, startDate, endDate } = this.props;

        return (
            <Page>
                <Header user={ondernemer} />
                <Content>
                    <OndernemerProfileHeader user={ondernemer} />
                    <h1 className="h1">Markten</h1>
                    <OndernemerAanwezigheid {...this.props} />
                </Content>
            </Page>
        );
    }
}

module.exports = OndernemerDashboard;
