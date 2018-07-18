const chalk = require('chalk')

class Post {
  constructor(title, url, points, item_id, name) {
    this.title = title
    this.url = url
    this.points = points
    this.item_id = item_id
    this.username = name
    this.comment = []
  }

  add_comment(newComment) {
    this.comment.push(newComment)
    return chalk.green('Add Comment Success')
  }

  comments() {
    console.log(chalk.blue(`Post Title: ${this.title}`))
    console.log(chalk.blue(`Number of comment: ${this.comment.length}`))
    this.comment.map((data, i) => {
      console.log(`${chalk.yellow(i+1)}. User: ${chalk.green(data.name)}, Comment: ${chalk.cyan(data.comment)}`)
    })
    return chalk.cyan('Parsing data done!')
  }
  
}

module.exports = Post