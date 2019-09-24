import {
    IMarkt,
    IMarktindeling,
    IMarktondernemer,
    IMarktplaats,
    IToewijzing
} from '../markt.model';

const Toewijzing = {
    add: (
        indeling: IMarktindeling,
        ondernemer: IMarktondernemer,
        plaats: IMarktplaats
    ): IMarktindeling => {
        const { toewijzingen } = indeling;
        const index = toewijzingen.findIndex(({ erkenningsNummer }) =>
            erkenningsNummer === ondernemer.erkenningsNummer
        );

        // Nieuwe toewijzing, of combineer de reeds toegewezen plaatsen met
        // deze extra plaats in een nieuwe toewijzing.
        const toewijzing = !~index ?
                           Toewijzing._create(indeling, ondernemer, plaats) :
                           Toewijzing._mergeIn(toewijzingen[index], plaats);

        return {
            ...indeling,
            toewijzingQueue: indeling.toewijzingQueue.filter(({ erkenningsNummer }) =>
                erkenningsNummer !== ondernemer.erkenningsNummer
            ),
            openPlaatsen: indeling.openPlaatsen.filter(plaats =>
                !toewijzing.plaatsen.includes(plaats.plaatsId)
            ),
            // Als er al een toewijzing bestond moet die worden vervangen met de nieuwe
            // toewijzing. Anders kan de nieuwe toewijzing simpelweg aan de lijst toegevoegd
            // worden.
            toewijzingen: ~index ?
                          [...toewijzingen.slice(0, index), toewijzing, ...toewijzingen.slice(index+1)] :
                          toewijzingen.concat(toewijzing)
        };
    },

    find: (
        indeling: IMarktindeling,
        ondernemer: IMarktondernemer
    ) => {
        return indeling.toewijzingen.find(toewijzing =>
            toewijzing.erkenningsNummer === ondernemer.erkenningsNummer
        );
    },

    remove: (
        indeling: IMarktindeling,
        ondernemer: IMarktondernemer
    ): IMarktindeling => {
        const toewijzing = Toewijzing.find(indeling, ondernemer);
        if (!toewijzing) {
            return indeling;
        }

        const { marktplaatsen, openPlaatsen, toewijzingen } = indeling;
        const plaatsen = marktplaatsen.filter(plaats =>
            toewijzing.plaatsen.includes(plaats.plaatsId)
        );

        return {
            ...indeling,
            toewijzingQueue: indeling.toewijzingQueue.filter(({ erkenningsNummer }) =>
                erkenningsNummer !== ondernemer.erkenningsNummer
            ),
            toewijzingen: toewijzingen.filter(t => t !== toewijzing),
            openPlaatsen: [...openPlaatsen, ...plaatsen]
        };
    },

    _create: (
        markt: IMarkt,
        ondernemer: IMarktondernemer,
        plaats: IMarktplaats
    ): IToewijzing => {
        return {
            marktId          : markt.marktId,
            marktDate        : markt.marktDate,
            plaatsen         : [plaats.plaatsId],
            ondernemer,
            erkenningsNummer : ondernemer.erkenningsNummer
        };
    },

    _mergeIn: (
        toewijzing: IToewijzing,
        plaats: IMarktplaats
    ): IToewijzing => {
        return  {
            ...toewijzing,
            plaatsen: [...toewijzing.plaatsen, plaats.plaatsId]
        };
    }
};

export default Toewijzing;
