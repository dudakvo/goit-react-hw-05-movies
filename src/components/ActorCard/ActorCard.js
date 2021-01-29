import actorNotFound from '../../img/castNotFound.jpg';

export default function ActorCard({
  name,
  profile = actorNotFound,
  character,
}) {
  return (
    <li>
      <img src={profile} alt={name} height="100px" />
      <p>
        {character}:<span>{name}</span>
      </p>
    </li>
  );
}
