const express = require("express")
const { listen } = require("express/lib/application")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const farmIssues = new Map()
const farmIssue= {editNum : "", editAddress: "", imgUrl : ""}
const id = generateUUID()

function generateUUID() { 
    var d = new Date().getTime();
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


app.post("/farmIssue", (req, res) => {
    let body = req.body
    try{
        console.log(body)
        id = generateUUID()
        console.log(id)
        farmIssues.set(id , farmIssue)
        res.json({success: true})
    }catch(e){
        console.log(e)
        res.json({success:false})
    }

})

app.get("/farmIssue/list", (req, res) => {
    console.log(farmIssues)
    console.log({success: true, IssueList:Array.from(farmIssues.values())})
    res.json({success: true, IssueList:Array.from(farmIssues.values())})
})

app.post("/farmIssue/delete", (req, res) => {
    let body = req.body
    try{
        console.log(body)
        farmIssues.set(id , body)
        res.json({success: true})
    }catch(e){
        console.log(e)
        res.json({success:false})
    }
})

//node index.js
app.listen(4000, () => console.log("start"));