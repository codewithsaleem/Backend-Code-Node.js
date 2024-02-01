let furnitureArray = [
    {
        prodCode: "DS2S245",
        category: "Dining",
        desc: [
            "Two	seater	Dining	Set",
            "Built	from	High	quality	wood",
            "1	year	warranty"
        ],
        img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVHH1d5JsvCZI119Jb92fCIsplN93uepnaAA&usqp=CAU",
        ingredients: [
            { ingName: "Dining	Table", qty: 1 },
            { ingName: "Chair", qty: 2 }
        ],
        title: "Two	seater	Dining	Set"
    },
    {
        prodCode: "DS6S761",
        category: "Dining",
        desc: [
            "Six	Seater	Dining	Set	in	Antique	Cherry	Colour",
            "Assembly	by	Skilled	Carpenters",
            "Made	from	Teak	wood"
        ],
        img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHsiCIwq6W5OlP5czWxDt3XKMlwxrkS3ZCSA&usqp=CAU",
        ingredients: [
            { ingName: "Dining	Table", qty: 1 },
            { ingName: "Chair", qty: 4 },
            { ingName: "Bench", qty: 1 }
        ],
        title: "Six	Seater	Dining	Set"
    },
    {
        prodCode: "DS4S177",
        category: "Dining",
        desc: [
            "Mild	Steel	Four	Seater	Dining	Set	in	Black	Colour",
            "Knock-down	construction	for	easy	transportation"
        ],
        img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCq8syU36kiInUvf5KptUofnO0kU-2r8o-Lg&usqp=CAU",
        ingredients: [
            { ingName: "Dining	Table", qty: 1 },
            { ingName: "Chair", qty: 4 }
        ],
        title: "Mild	Steel	Dining	Set"
    },
    {
        prodCode: "DC2S705",
        category: "Dining",
        desc: [
            "Solid	Wood	Dining	Chair	Set	of	Two	in	Dark	Walnut	Colour",
            "Beautiful	design	carved	on	dining	chair",
            "Dining	chair	seat	upholstered	in	dark	brown	Fabric"],
        img:
            "https://hometown.gumlet.io/media/product/07/9453/74986/1.jpg?mode=fill&h=360&w=360&dpr=1.5",
        ingredients: [{ ingName: "Chair", qty: 2 }],
        title: "Dining	Chair	Set"
    },
    {
        prodCode: "BN1S388",
        category: "Dining",
        desc: [
            "Solid	Wood	Dining	Bench	in	Dark	Walnut	Colour",
            "Comfortable	bench	for	a	relaxed	dinner"
        ],
        img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrhCbSy_H0F5xYVeo-KdikB2Ny-aOkWpc9SQ&usqp=CAU",
        ingredients: [{ ingName: "Bench", qty: 1 }],
        title: "Dining	Bench"
    },
    {
        prodCode: "SF2S532",
        category: "Drawing",
        desc: [
            "Characteristic	Rising	Track	Arm	Rest	Design",
            "Premium	High	Gloss	Leatherette	Upholstery",
            "Independent	Headrest	And	Lumber	Support"
        ],
        img:
            "https://5.imimg.com/data5/SELLER/Default/2021/3/NT/AH/QP/39216998/bella-two-seater-sofa-in-modern-grey-fabric.jpg",
        ingredients: [{ ingName: "Sofa", qty: 1 }],
        title: "Two	Seater	Sofa"
    },
    {
        prodCode: "SF2S206",
        category: "Drawing",
        desc: ["Two	Seater	Sofa	in	Blue	Colour", "Assembly	by	Skilled	Carpenters"],
        img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSynGakGbJbrUQRRA_7AQEHipBtinP1Hk9OKw&usqp=CAU",
        ingredients: [{ ingName: "Sofa", qty: 1 }],
        title: "Two	Seater	Sofa"
    },
    {
        prodCode: "SFBD311",
        category: "Drawing",
        desc: [
            "Sofa	Cum	bed	in	Brown	Colour",
            "Ply-wood	construction	with	hand	polished	finish",
            "Removable	fabric	cover	on	best	quality	foam	mattress",
            "Throw	cushions	and	bolsters	come	with	the	product"
        ],
        img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWK3Ep772JnXCOO4t5dGT0IglwUO2j1rCBcQ&usqp=CAU",
        ingredients: [{ ingName: "Sofa", qty: 1 }, { ingName: "Cushions", qty: 2 }],
        title: "Sofa	cum	Bed"
    },
    {
        prodCode: "BDQS381",
        category: "Bedroom", desc: [
            "Wood	Box	Storage	King	Size	Bed	in	Wenge	Colour	",
            "Box	Storage	included	for	Maximum	space	utilization",
            "Mattress	is	included"
        ],
        img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwazpkP82G3PxNUFvUK-wlIfYK9ihM9_0q9A&usqp=CAU",
        ingredients: [{ ingName: "Bed", qty: 1 }, { ingName: "Mattress", qty: 2 }],
        title: "King	size	Bed"
    },
    {
        prodCode: "BDQS229",
        category: "Bedroom",
        desc: [
            "Wood	Hydraulic	Storage	Queen	Size	Bed",
            "Half	hydraulic	storage",
            "Superior	E2	grade	MDF	used	with	melamine	finish"
        ],
        img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbseiOZDcbxbkCs1lqYtVA0IiFXyPIHGtIuw&usqp=CAU",
        ingredients: [{ ingName: "Bed", qty: 1 }],
        title: "Queen	size	Bed"
    },
    {
        prodCode: "ST1T425",
        category: "Study",
        desc: [
            "Wood	Study	Table	in	Walnut	Colour",
            "Assembly	by	Skilled	Carpenters",
            "Built	from	High	Quality	Wood"
        ],
        img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0PCRfmKjN3h8yrJdJrP6vsY2rtSQolCN7lA&usqp=CAU",
        ingredients: [{ ingName: "Study	Table", qty: 1 }],
        title: "Study	Table"
    },
    {
        prodCode: "ST1T588",
        category: "Study",
        desc: [
            "	Wood	Study	Table	in	Highgloss	White	&	Blue	Colour",
            "Study	table	comes	with	bookshelf	on	top,	5	drawers	&	1	open	shelf",
            "Superior	quality	MDF	with	stain	resistant	melamine	finish"
        ],
        img:
            "https://www.jiomart.com/images/product/original/rvkvifja8m/xure-blue-laptop-table-4-product-images-orvkvifja8m-p598532043-1-202302190153.jpg?im=Resize=(420,420)",
        ingredients: [{ ingName: "Study	Table", qty: 1 }],
        title: "Study	Table"
    }
]
let loginData = [
    { email: "user@user.com", password: "user123", role: "user" },
    { email: "admin@admin.com", password: "admin123", role: "admin" },
]
module.exports.furnitureArray = furnitureArray;
module.exports.loginData = loginData;
