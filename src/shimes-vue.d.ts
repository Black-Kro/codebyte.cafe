declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    var component: ComponentOptions
    export default component
}


declare module '*.graphql' {
    import { DocumentNode } from 'graphql'
    const Schema: DocumentNode
  
    export = Schema
}

  
declare module '*.gql' {
    import { DocumentNode } from 'graphql'
    const Schema: DocumentNode
  
    export = Schema
}