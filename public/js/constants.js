// ________________________________CONSTANTS___________________________________
export const NOT_LOOKING_FOR_MATCH = 0;
export const LOOKING_FOR_NORMAL_MATCH = 1;
export const LOOKING_FOR_HARDCORE_MATCH = 2;
export const LOOKING_FOR_CORRESPONDENCE_MATCH = 3;
export const LOOKING_FOR_HARDCORE_CORRESPONDENCE_MATCH = 4;
export const USER_ON_TURN = 0;
export const OPPONENT_ON_TURN = 1;

export const RANKS = Object.freeze ([
    "Cadet",
    "1st class soldier (1 win)",
    "2nd class soldier (10 wins)",
    "Lance corporal (20 wins)",
    "Corporal (30 wins)",
    "Sergeant (50 wins)",
    "Skipper (70 wins)",
    "Sergeant major (90 wins)",
    "Warrant Officer (100 wins)",
    "Ensign (120 wins)",
    "Lieutenant (150 wins)",
    "First Lieutenant (200 wins)",
    "Captain (250 wins)",
    "Colonel (300 wins)",
    "Brigadier general (400 wins)",
    "General (500 wins)"
]);



export const initialGlobalState = {
    appState: {
        name: '',
        password: '',
        failed: false,
        userId: -1,
        token: '',
        auth: false,
        opponentName: "",
        running: false,
        playerStats: {

        },
        playedCard: {
            img: "back",
            name: "",
            description: "",
            requirements: {}
        },
        opponentStats: {

        },
        onTurn: false, //kym cakame na oponenta, nic sa nebude diat
        cards: [
            {
                img: "",
                name: "",
                description: "",
                requirements: {}
            },
            {
                img: "back",
                name: "",
                description: "",
                requirements: {}
            },
            {
                img: "back",
                name: "",
                description: "",
                requirements: {}
            },
            {
                img: "back",
                name: "",
                description: "",
                requirements: {}
            },
            {
                img: "back",
                name: "",
                description: "",
                requirements: {}
            },
            {
                img: "back",
                name: "",
                description: "",
                requirements: {}
            },
            {
                img: "back",
                name: "",
                description: "",
                requirements: {}
            },
            {
                img: "back",
                name: "",
                description: "",
                requirements: {}
            }
        ],
        correspondenceGame: false,
        lookingForGame: null
    },
    routing: {
        location: null
    }
};/*toto bude tazke s tym routingom spojit */