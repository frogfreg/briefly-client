export default function SmallBrief() {
  return (
    <article className="flex  border-t-2 border-main-clear py-2">
      <div className="w-1/5 flex flex-col items-center">
        <img
          className="w-20 min-48 rounded-full"
          src="https://images.pexels.com/photos/148182/pexels-photo-148182.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          width="80px"
        />
      </div>
      <div className="text-lg px-2">
        <p>
          <b>@username</b>{" "}
        </p>
        <p>
          Aute nisi id exercitation exercitation dolore elit aute.Sit ipsum qui
          proident deserunt ex veniam elit voluptate elit enim.
        </p>
        <div>Favs and comments</div>
      </div>
    </article>
  );
}
