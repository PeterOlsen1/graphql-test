import { gql } from "@apollo/client";

export const GET_REPO = (user: string, repo: string) => gql`
    query {
        repository(owner: "${user}", name: "${repo}") {
            id
            name
            description
            url
            owner {
                login
                avatarUrl
                url
            }
            object(expression: "HEAD:") {
                ... on Tree {
                    entries {
                        name
                        type
                        path
                    }
                }
            }
        }
    }
`;

export const GET_USER_FULL = (user: string) => gql`
    query {
        user (login: "${user}") {
            id
            login
            name
            bio
            avatarUrl
            url
            location
            followers(first: 100) {
                totalCount
                nodes {
                    login
                    name
                    url
                    avatarUrl
                }
            }
            following {
                totalCount
            }
            repositories(first: 100) {
                totalCount
                nodes {
                    name
                    url
                    description
                    owner {
                        id
                    }
                    languages(first: 10) {
                        totalCount
                        edges {
                            size
                            node {
                                name
                                color
                            }
                        }
                    }
                }
            }
            starredRepositories {
                totalCount
            }
        }
    }
`;

export const GET_USER_SHORT = (user: string) => gql`
    query {
        user (login: "${user}") {
            id
            login
            name
            avatarUrl
            url
        }
    }
`;