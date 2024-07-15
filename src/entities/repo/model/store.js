import { makeAutoObservable } from 'mobx';

class RepoStore {
  query = '';
  repos = [];
  favorites = [];
  loading = false;
  selectedRepo = null;
  error = null;

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

  setSelectedRepo(repo) {
    this.selectedRepo = repo;
  }

  setError(error) {
    this.error = error;
  }

  clearError() {
    this.error = null;
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
    this.clearError();
    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=${query}`);
      const data = await response.json();
      if (response.ok) {
        this.setRepos(data.items);
      } else {
        throw new Error(data.message || 'Failed to fetch repositories');
      }
    } catch (error) {
      this.setError(error.message);
    }
    this.setLoading(false);
  }

  async fetchRepoDetails(owner, repoName) {
    this.setLoading(true);
    this.clearError();
    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}`);
      const data = await response.json();
      if (response.ok) {
        this.setSelectedRepo(data);
      } else {
        throw new Error(data.message || 'Failed to fetch repository details');
      }
    } catch (error) {
      this.setError(error.message);
    }
    this.setLoading(false);
  }
}

const repoStore = new RepoStore();
export default repoStore;

