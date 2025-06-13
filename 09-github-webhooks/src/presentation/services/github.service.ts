import { GithubStarPayload } from "../../interfaces";

export class GithubService {
  constructor() {}

  onStar(payload: GithubStarPayload): string {
    let message: string = '';
    // starred_at : fecha y hora en que se hizo la estrella
    const { action, starred_at, repository, sender } = payload;

    console.log(starred_at);

    if( starred_at ){
      return `El usuario ${sender.login} hizo una estrella en el repositorio ${repository.full_name} el ${starred_at}`;
    }else{
      return `El usuario ${sender.login} removio una estrella en el repositorio ${repository.full_name}`;
    }
  }
}