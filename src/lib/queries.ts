import { gql } from "@apollo/client";

export const GET_REPO = (user: string, repo: string) => gql`
    query {
        repository(owner: "${user}", name: "${repo}") {
            id
            name
            owner {
                login
                avatarUrl
                url
            }
        }
    }
`;

export const GET_USER = (user: string) => gql`
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
