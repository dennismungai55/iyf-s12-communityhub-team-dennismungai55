function Avatar({
  name = "User",
  image,
  size = 48,
}) {
  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
      }}
    >
      {image ? (
        <img src={image} alt={`${name}'s profile`} />
      ) : (
        <span aria-label={`${name}'s initials`}>
          {name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}

export default Avatar;
