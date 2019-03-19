/*
--monthTextColor:#fff;
		--level0Color:#28823a;
		--level1Color:#CF022B;
		--fontFamily: 'Roboto', Myriad, 'Roboto', sans-serif;
			
*/
const editableProperties = [
    {
    propName:'--monthTextColor',
    type:'color'
    },
     {
    propName:'--level0Color',
    type:'color'
    },
     {
    propName:'--level1Color',
    type:'color'
    },
    {
    propName:'--fontFamily',
    type:'font',
    options:
        [
            {
                value:"Roboto', Myriad, 'Roboto', sans-serif;",
                label:"Android"
            },
            {
                value:"MySopraFontRegular",
                label:"Sopra Steria"
            }
            
        ]
    }
    
];

const presets = [
    {
        name:"Sopra Steria"
    }
    ]