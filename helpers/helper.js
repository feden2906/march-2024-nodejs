const foo = () => {
    console.log(2222);

    console.log(__dirname)
    console.log(__filename)
    console.log(process.cwd())
}

module.exports ={
    foo
}
