//requirements, img, name, description, effects
/*

{
        id:0,
        name: "",
        description: "",
        img: "IMG",
        effects: {}
    }
    */

const generator = [0,0,0,0,1,1,1,2,2,3,3,3,3,4,4,4,4,5,5,5,6,7,7,8,8,9,9,
    10,10,10,10,11,11,11,12,12,12,12,13,13,14,14,15,15,15,16,16,17,17,17,
    18,18,18,19,19,19,20,20,20,21,21,21,22,22,22,23,23,24,24,25,25,26,26,
    27,27,28];
const cards  = [
    {
        id:0,
        name: "wall",
        description: "",
        img: "IMGwall",
        requirements: {},
        effects: {}
    },
    {
        id:1,
        name: "defense",
        description: "",
        img: "IMGdefense",
        requirements: {},
        effects: {}
    },
    {
        id:2,
        name: "fence",
        description: "",
        img: "IMGfence",
        requirements: {},
        effects: {}
    },
    {
        id:3,
        name: "base",
        description: "",
        img: "IMGbase",
        requirements: {},
        effects: {}
    },
    {
        id:4,
        name: "tower",
        description: "",
        img: "IMGtower",
        requirements: {},
        effects: {}
    },
    {
        id:5,
        name: "fort",
        description: "",
        img: "IMGfort",
        requirements: {},
        effects: {}
    },
    {
        id:6,
        name: "babylon",
        description: "",
        img: "IMGbabylon",
        requirements: {},
        effects: {}
    },
    {
        id:7,
        name: "reserves",
        description: "",
        img: "IMGreserves",
        requirements: {},
        effects: {}
    },
    {
        id:8,
        name: "pixies",
        description: "",
        img: "IMGpixies",
        requirements: {},
        effects: {}
    },
    {
        id:9,
        name: "wain",
        description: "",
        img: "IMGwain",
        requirements: {},
        effects: {}
    },
    {
        id:10,
        name: "archer",
        description: "",
        img: "IMGarcher",
        requirements: {},
        effects: {}
    },
    {
        id:11,
        name: "raider",
        description: "",
        img: "IMGraider",
        requirements: {},
        effects: {}
    },
    {
        id:12,
        name: "platoon",
        description: "",
        img: "IMGplatoon",
        requirements: {},
        effects: {}
    },
    {
        id:13,
        name: "siege",
        description: "",
        img: "IMGsiege",
        requirements: {},
        effects: {}
    },
    {
        id:14,
        name: "banshee",
        description: "",
        img: "IMGbanshee",
        requirements: {},
        effects: {}
    },
    {
        id:15,
        name: "swat",
        description: "",
        img: "IMGswat",
        requirements: {},
        effects: {}
    },
    {
        id:16,
        name: "dragon",
        description: "",
        img: "IMGdragon",
        requirements: {},
        effects: {}
    },
    {
        id:17,
        name: "conjure bricks",
        description: "",
        img: "IMGconjureBricks",
        requirements: {},
        effects: {}
    },
    {
        id:18,
        name: "conjure crystals",
        description: "",
        img: "IMGconjureCrystals",
        requirements: {},
        effects: {}
    },
    {
        id:19,
        name: "conjure weapons",
        description: "",
        img: "IMGconjureWeapons",
        requirements: {},
        effects: {}
    },
    {
        id:20,
        name: "destroy bricks",
        description: "",
        img: "IMGdestroyBricks",
        requirements: {},
        effects: {}
    },
    {
        id:21,
        name: "destroy crystals",
        description: "",
        img: "IMGdestroyCrystals",
        requirements: {},
        effects: {}
    },
    {
        id:22,
        name: "destroy weapons",
        description: "",
        img: "IMGdestroyWeapons",
        requirements: {},
        effects: {}
    },
    {
        id:23,
        name: "saboteur",
        description: "",
        img: "IMGsaboteur",
        requirements: {},
        effects: {}
    },
    {
        id:24,
        name: "thief",
        description: "",
        img: "IMGthief",
        requirements: {},
        effects: {}
    },
    {
        id:25,
        name: "wizard",
        description: "",
        img: "IMGwizard",
        requirements: {},
        effects: {}
    },
    {
        id:26,
        name: "recruit",
        description: "",
        img: "IMGrecruit",
        requirements: {},
        effects: {}
    },
    {
        id:27,
        name: "school",
        description: "",
        img: "IMGschool",
        requirements: {},
        effects: {}
    },
    {
        id:28,
        name: "curse",
        description: "",
        img: "IMGcurse",
        requirements: {},
        effects: {}
    }
];
//tu nejak este achievementy

const generateNewCard = function() {
    const id = Math.floor((Math.random()*generator.length));
    return cards[generator[id]];
};
const checkRequirements = function() {

};
const applyEffects = function() {

};
module.exports = {
    generateNewCard: generateNewCard,
    checkRequirements: checkRequirements,
    applyEffects: applyEffects
}