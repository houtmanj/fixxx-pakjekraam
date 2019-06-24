const React = require('react');
const Page = require('./components/Page.jsx');
const PropTypes = require('prop-types');
const Header = require('./components/Header');
const Content = require('./components/Content');
const OndernemerAanwezigheid = require('./components/OndernemerAanwezigheid');
const OndernemerProfileHeader = require('./components/OndernemerProfileHeader');
const OndernemerMarktHeading = require('./components/OndernemerMarktHeading');
const OndernemerMarktVoorkeuren = require('./components/OndernemerMarktVoorkeuren');
const OndernemerMarktAanwezigheid = require('./components/OndernemerMarktAanwezigheid');
const Button = require('./components/Button');
const { getMarktDays, parseMarktDag, filterRsvpList } = require('../domain-knowledge.js');

class OndernemerMarktDetailPage extends React.Component {
    propTypes = {
        ondernemer: PropTypes.object.isRequired,
        plaatsvoorkeuren: PropTypes.array.isRequired,
        aanmeldingen: PropTypes.array.isRequired,
        markt: PropTypes.object.isRequired,
        marktId: PropTypes.string.isRequired,
        messages: PropTypes.array,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        user: PropTypes.object,
    };

    render() {
        const { ondernemer, plaatsvoorkeuren, aanmeldingen, messages, markt, marktId } = this.props;
        const sollicitatie = ondernemer.sollicitaties.find(soll => soll.markt.id === markt.id);
        const rsvpEntries = filterRsvpList(aanmeldingen.filter(aanmelding => aanmelding.marktId === markt.id), markt);

        return (
            <Page messages={messages}>
                <Header user={ondernemer} logoUrl={`/dashboard/${ondernemer.erkenningsnummer}`}>
                    <OndernemerProfileHeader user={ondernemer} />
                </Header>
                <Content>
                    <OndernemerMarktHeading sollicitatie={sollicitatie} markt={markt} />
                    <div className="row well">
                        <div className="col-1-2">
                            <OndernemerMarktAanwezigheid
                                markt={markt}
                                ondernemer={ondernemer}
                                sollicitatie={sollicitatie}
                                rsvpEntries={rsvpEntries}
                            />
                        </div>
                        <div className="col-1-2">
                            <OndernemerMarktVoorkeuren
                                ondernemer={ondernemer}
                                markt={markt}
                                plaatsvoorkeuren={plaatsvoorkeuren}
                            />
                            <Button
                                label="Wijzig algemene voorkeuren"
                                type={`secondary`}
                                href={`/algemene-voorkeuren/${ondernemer.erkenningsnummer}/${
                                    markt.id
                                }/?next=/markt-detail/${ondernemer.erkenningsnummer}/${markt.id}/`}
                            />
                        </div>
                    </div>
                </Content>
            </Page>
        );
    }
}

module.exports = OndernemerMarktDetailPage;