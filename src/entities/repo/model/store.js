import { makeAutoObservable } from 'mobx';

class RepoStore {
  query = '';
  repos = [];
  favorites = [];
  loading = false;
  selectedRepo = null;
  error = '';

  abortController = null;

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
    this.setError('');

    if (this.abortController) {
      this.abortController.abort();
    }
    this.abortController = new AbortController();

    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=${query}`, {
        signal: this.abortController.signal,
      });
      const data = await response.json();
      this.setRepos(data.items || []);
    } catch (error) {
      if (error.name !== 'AbortError') {
        this.setError('Error fetching the repositories');
      }
    } finally {
      this.setLoading(false);
    }
  }

  async fetchRepoDetails(owner, repoName) {
    this.setLoading(true);
    this.setError('');
    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}`);
      const data = await response.json();
      this.setSelectedRepo(data);
    } catch (error) {
      this.setError('Error fetching the repository details');
    } finally {
      this.setLoading(false);
    }
  }

  handleFavoriteToggle(repo) {
    if (this.favorites.some((favorite) => favorite.id === repo.id)) {
      this.removeFromFavorites(repo.id);
    } else {
      this.addToFavorites(repo);
    }
  }

  handleInputChange(query) {
    this.setQuery(query);
    this.fetchRepos(query);
  }
}

const repoStore = new RepoStore();
export default repoStore;


