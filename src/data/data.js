const POLLS=[
        {
            id:'10',
            title:'What Is your favorite programming languages',
            description:'There are lots of language available',
            options:[
                {id:'1',value:'C programming',vote:0},
                {id:'2',value:'Java',vote:0},
                {id:'3',value:'Python',vote:0},
            ],
            time:new Date(),
            totalvote:0,
            opinions:[]
        }, {
            id:'11',
            title:'What Is your Favorite  Front-End Framework',
            description:'There are lots of language available',
            options:[
                {id:'1',value:'React',vote:0},
                {id:'2',value:'Vue',vote:0},
                {id:'3',value:'Angular',vote:0},
            ],
            time:new Date(),
            totalvote:0,
            opinions:[]
        },
        {
            id:'12',
            title:'What Is The Best Language For Create Android App',
            description:'There are lots of language available',
            options:[
                {id:'1',value:'Kotlin',vote:0},
                {id:'2',value:'Java',vote:0},
                {id:'3',value:'React Native',vote:0},
            ],
            time:new Date(),
            totalvote:0,
            opinions:[]
        },
]

export default POLLS;
