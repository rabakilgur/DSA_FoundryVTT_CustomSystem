export default class LazyImporter {
    static async bindImports() {
        import ("./import_functions.js").then(module => {
            game.cDSA.importers = module
        })
    }
    static async bindInitCreator() {
        import ("./init_creator.js").then(module => {
            game.cDSA.initCreator = module
        })
    }
}