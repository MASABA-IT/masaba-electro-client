import { useProductStore } from "../../providers/AppProviders";

const AuthorDetails = ({ author }) => {
  const { BASE_URL } = useProductStore();
  return (
    <div className=" author-details-container flex flex-col md:flex-row mb-5">
      <div className="author-image-container w-full md:w-1/4 p-2">
        <img
          src={`${BASE_URL}/${author?.image}`}
          alt={author?.name}
          className="author-image w-full h-auto rounded-lg"
        />
      </div>

      <div className="author-info-container w-full   md:pl-4 ">
        <h2 className="author-name text-xl font-semibold">{author?.name}</h2>
        <p className="author-description  mt-2 text-gray-700">
          {author?.description}
        </p>
      </div>
    </div>
  );
};

export default AuthorDetails;
