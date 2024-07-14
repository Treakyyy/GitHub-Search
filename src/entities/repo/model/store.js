import { makeAutoObservable } from 'mobx';

class RepoStore {
  query = '';
  repos = [];
  favorites = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setQuery(query) {
    this.query = query;
  }

  setRepos(repos) {
    this.repos = repos;
  }

  setLoading(loading) {
    this.loading = loading;
  }

  addToFavorites(repo) {
    if (!this.favorites.some((favorite) => favorite.id === repo.id)) {
      this.favorites.push(repo);
    }
  }

  removeFromFavorites(repoId) {
    this.favorites = this.favorites.filter((repo) => repo.id !== repoId);
  }

  async fetchRepos(query) {
    this.setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=${query}`);
      const data = await response.json();
      this.setRepos(data.items);
    } catch (error) {
      console.error('Error fetching the repositories:', error);
    }
    this.setLoading(false);
  }
}

const repoStore = new RepoStore();
export default repoStore;
