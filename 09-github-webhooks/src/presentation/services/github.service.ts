import { GithubIssuePayload, GithubStarPayload } from "../../interfaces";

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

  onIssue(payload: GithubIssuePayload): string {

    const { action, issue, repository, sender } = payload;

    if( action === 'opened' ){
      return `El usuario ${sender.login} abrio el issue ${issue.title} en el repositorio ${repository.full_name}`;
    }else if( action === 'closed' ){
      return `El usuario ${sender.login} cerro el issue ${issue.title} en el repositorio ${repository.full_name}`;
    }else if( action === 'reopened' ){
      return `El usuario ${sender.login} reabrio el issue ${issue.title} en el repositorio ${repository.full_name}`;
    }else if( action === 'edited' ){
      return `El usuario ${sender.login} edito el issue ${issue.title} en el repositorio ${repository.full_name}`;
    }else if( action === 'deleted' ){
      return `El usuario ${sender.login} elimino el issue ${issue.title} en el repositorio ${repository.full_name}`;
    }else if( action === 'commented' ){
      return `El usuario ${sender.login} comento en el issue ${issue.title} en el repositorio ${repository.full_name}`;
    }else{
      return `Evento de tipo ${action} no soportado`;
    }
  }
}