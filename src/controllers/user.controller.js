import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
  // get details from the frontend
  // validation -- Not Empty
  // Check if user already exits : username, email
  // Check if Avatar image
  // Upload to Cloudinary
  // Create user object - create entry in DB
  // remove password and refresh token field from response
  // check for user creation
  // return response

  const { fullName, username, email, password } = req.body;

  if (
    [fullName, email, username, password].some((value) => value?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  //TODO:Change Validation to ZOD

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "Email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is Required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user ");
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User Created Successfully")
  )
});
export { registerUser };
