const cheerio = require("cheerio");
const request = require("request");
const [ url ] = process.argv.slice(2);
const Post = require("./post");
const Comment = require("./comment")

let scrappingWeb = ''
let name = []
let title = ''
let urls = ''
let point = ''
let id = ''
let dataComment = ''

request(url, (err, res, data) => {
  if (err) throw err;

  let doc = cheerio.load(data)

  // untuk mendapatkan username
  doc('span[class="comhead"] > a:first-child').each((i, value) => {
    name.push(value["children"][0].data)
  });

  //mendapatkan title discuss
  doc('td[class="title"] > a:first-child').each((i, value) => {
    title = value["children"][0].data 
  });

  // untuk mendapatkan url title discus
  doc('a[class="storylink"]').each((i, value) => {
    urls = value.attribs.href 
  });

  //untuk mendapatkan point
  doc('span[class="score"]').each((i, value) => {
    point = value["children"][0].data 
  });

  // untuk mendapatkan id
  doc('tr[class="athing"]').each((i, value) => {
    id = value.attribs.id 
  });

  scrappingWeb = new Post(title, urls, point, id, name)

  // untuk mendapatkan comment
  doc('span[class="c00"]').each((i, value) => {
    dataComment = value['children'][0].data
    scrappingWeb.add_comment(new Comment(id, name[i], dataComment, new Date()))
  })

  console.log(scrappingWeb.add_comment(new Comment('140899', 'arisupriatna14', 'Javascript awesome', new Date())))
  console.log(scrappingWeb.comments());
  // console.log(scrappingWeb)
});
