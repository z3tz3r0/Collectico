import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Stack } from "@mui/material";
import { routePaths } from "@/shared/config/routes";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { apiPaths } from "../../service/api";
import ButtonSubmit from "../components/ButtonSubmit";
import ButtonTogglePostPage from "../components/ButtonTogglePostPage";
import Navbar from "../components/Navbar";
import ColumnInput from "../components/ColumnInput";
import PreviewCard from "../components/PreviewCard";
import TagSeller from "../components/TagSeller";
import UploadImage from "../components/UploadImage";
import { useAuth } from "../contexts/AuthContext";

import BreadcrumbsNav from "../components/BreadcrumbsNav";
// import baseURL from "../../service/api";

export default function PostPage() {
  const { user } = useAuth();
  const { editId } = useParams();

  // STATE FOR KEEP ONCHANGE INPUT VALUE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artist, setArtist] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [material, setMaterial] = useState("");
  const [yearCreated, setYearCreated] = useState("");
  const [tags, setTags] = useState([]);
  const [price, setPrice] = useState("");
  const [minBidPrice, setMinBidPrice] = useState("");
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [min, setMin] = useState("");

  const links = [
    { label: "Home", to: routePaths.home },
    { label: "Market", to: routePaths.market },
  ];

  // STATE FOR KEEP ERROR MESSAGE
  const [error, setError] = useState("");

  // STATE FOR AUCTION
  const [auction, setAuction] = useState(false);

  // STATE FOR PREVIEW
  const [preview, setPreview] = useState(false);

  // STATE FOR EDIT MODE
  const [editMode, setEditMode] = useState(false);
  const [toggleValue, setToggleValue] = useState("fixPrice");

  // STATE IMAGE
  const [image, setImage] = useState("");

  // Function for TOGGLE BUTTON
  function showAuction() {
    setAuction(true);
    setPrice("");
  }
  function diasableAuction() {
    setAuction(false);
    setMinBidPrice("");
    setDays("");
    setHours("");
  }

  // Function for VALIDATION
  function validation() {
    const validatedError = {};

    // validate title
    if (!title) {
      validatedError.title = "Title is required.";
    } else if (title.length > 24) {
      validatedError.title = "Please enter no more than 24 characters.";
    }
    // validate description
    if (!description) {
      validatedError.description = "Description is required.";
    }
    // validate artist
    if (!artist) {
      validatedError.artist = "Artist name is required.";
    } else if (artist.length > 26) {
      validatedError.artist = "Please enter no more than 26 characters.";
    }
    // validate dimensions
    if (!dimensions) {
      validatedError.dimensions = "Dimensions is required.";
    }
    // validate material
    if (!material) {
      validatedError.material = "Material is required.";
    }
    // validate yearCreated
    if (!yearCreated) {
      validatedError.yearCreated = "Year Created is required.";
    } else if (isNaN(yearCreated) || !Number.isInteger(+yearCreated)) {
      validatedError.yearCreated = "Please enter a valid year.";
    } else if (yearCreated < 0 || yearCreated > 2025) {
      validatedError.yearCreated = "Please enter a year between 0 to 2025.";
    }
    // validate tags
    if (tags.length === 0) {
      validatedError.tags = "Tag is required.";
    }

    // validate fixed price
    if (!auction) {
      if (!price) {
        validatedError.price = "Price is required.";
      } else if (isNaN(price)) {
        validatedError.price = "Please enter a number.";
      } else if (price <= 0) {
        validatedError.price = "Please enter a valid price.";
      } else if (!/^\d+(\.\d{1,2})?$/.test(price)) {
        validatedError.price =
          "Please enter a valid number (maximum 2 digits after the decimal point).";
      }
    }

    // validate auction minBidPrice
    if (auction) {
      if (!minBidPrice) {
        validatedError.minBidPrice = "Minimum Bid Price is required.";
      } else if (isNaN(minBidPrice)) {
        validatedError.minBidPrice = "Please enter a number.";
      } else if (minBidPrice <= 0) {
        validatedError.minBidPrice = "Please enter a valid Minimum Bid Price.";
      } else if (!/^\d+(\.\d{1,2})?$/.test(minBidPrice)) {
        validatedError.minBidPrice =
          "Please enter a valid number (maximum 2 digits after the decimal point).";
      }
    }

    // validate auction days
    if (auction) {
      if (!days) {
        validatedError.days = "Days is required.";
      } else if (!/^[0-7]$/.test(days)) {
        validatedError.days = "Please enter number between 0 and 7.";
      } else if ((Number(days) * 24 + Number(hours)) > 168) {
        validatedError.days = "Maximum duration is 7 days."
      }
    }

    // validate auction hours
    if (auction) {
      if (!hours) {
        validatedError.hours = "Hours is required.";
      } else if (!/^(?:[01]?[0-9]|[2][0-3])$/.test(hours)) {
        validatedError.hours = "Please enter number between 0 and 23.";
      }
    }

    // validate auction minute
    if (auction) {
      if (!min) {
        validatedError.min = "Minute is required.";
      } else if (!/^(?:[0-9]|[1-5][0-9])$/.test(min)) {
        validatedError.min = "Please enter number between 0 and 59.";
      }
    }

    return validatedError;
  }

  //For navigate to another page
  const navigate = useNavigate();

  // For EDIT PRODUCT
  useEffect(() => {
    const fetchEditProduct = async () => {
      if (!editId) return;
      try {
        const res = await api.get(apiPaths.products.edit(editId));
        const product = res.data.product;
        // console.log( product.auction.isAuction)
        setTitle(product.title || "");
        setDescription(product.description || "");
        setArtist(product.artist || "");
        setDimensions(product.dimensions || "");
        setMaterial(product.material || "");
        setYearCreated(product.yearCreated?.toString() || "");
        setTags(product.tags || []);
        setPrice(product.price || "");
        setMinBidPrice(product.minBidPrice || "");
        // setDays(product.auction?.days?.toString() || "");
        // setHours(product.auction?.hours?.toString() || "");
        setImage(product.image || "");
        setAuction(product.auction?.isAuction || false);
        setEditMode(true);
        setToggleValue(product.auction.isAuction ? "auction" : "fixPrice");
      } catch (err) {
        console.error("Failed to fetch product for edit", err);
      }
    };
    fetchEditProduct();
  }, [editId]);

  // Function for SUBMIT BUTTON
  async function handleSubmit(e) {
    e.preventDefault();
    const submitter = e.nativeEvent.submitter;
    const action = submitter?.value;
    const validatedError = validation();

    // VALIDATE INPUT FORM
    if (Object.keys(validatedError).length > 0) {
      // If there is an error
      setError(validatedError);
    } else {
      // Calculate End Date
      const now = new Date();
      const endDate = new Date(
        now.getTime() + (( (Number(days) * 24 + Number(hours)) * 60) + Number(min)) * 60 * 1000 //getTime() --> get current time in Milli Sec
      );
      const newProduct = {
        title,
        description,
        artist,
        price,
        image,
        dimensions,
        material,
        yearCreated,
        tags,
        sellerName: `${user.firstName || "Unknow"} ${user.lastName || "User"}`,
        auction: {
          isAuction: auction,
          days: Number(days),
          hours: Number(hours),
          endDate,
        },
        minBidPrice: minBidPrice,
        days: days,
        hours: hours,
        endDate: endDate, //Send endDate to Local storage
      };
      // CLICK PREVIEW BUTTON
      if (action === "preview") {
        setError("");
        window.scrollTo({ top: 200, behavior: "smooth" });
        setPreview(true);
        return;
      }
      // CLICK POST BUTTON
      try {
        if (action === "post") {
          await api.post(apiPaths.products.create, newProduct);

          alert("Your artwork is successfully posted!");
        } else if (action === "update") {
          await api.put(apiPaths.products.edit(editId), newProduct);
          alert("Product updated successfully");
        }
        navigate(routePaths.market);
      } catch (err) {
        console.error("Error submitting product:", err);
        alert("Submission failed. Try again later.");
      }
    }
  }

  return (
    <div className="w-full min-h-[100vh] bg-[#F2EEE7] text-[#62483A] px-2 py-2">
      {/* -------------------CONTENT----------------- */}
      <BreadcrumbsNav links={links} currentPage="Post page" />
      <div className="flex flex-col items-center w-full gap-10 py-[60px]">
        {!preview && (
          <h1 className="text-[1.6rem] font-bold">Post Your Product</h1>
        )}
        {preview && <h1 className="text-[1.6rem] font-bold">Preview</h1>}
        {/* ---------------FORM------------- */}
        <form
          action="#"
          className="relative w-[95%] sm:w-[80%] max-w-[800px] min-h-screen py-10 px-5 sm:px-15 bg-white rounded-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="pb-2 text-[1.2rem] font-bold">Product Information</h2>
          <hr className="pt-6" />
          {/* ---------------Product detail------------- */}
          <div className=" flex flex-col gap-6">
            {/* TITLE */}
            <Stack>
              <ColumnInput
                label="Title"
                placeholder="Enter a descriptive title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fontWeight="700"
              />
              {error.title && <p className="text-red-500">{error.title}</p>}
            </Stack>

            {/* DESCRIPTION */}
            <Stack>
              <ColumnInput
                label="Description"
                placeholder="Describe your product in detail..."
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fontWeight="700"
                multiline
                rows="4"
              />
              {error.description && (
                <p className="text-red-500">{error.description}</p>
              )}
            </Stack>

            {/* ARTIST */}
            <Stack>
              <ColumnInput
                label="Artist"
                placeholder="Enter an artist name"
                name="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                fontWeight="700"
              />
              {error.artist && <p className="text-red-500">{error.artist}</p>}
            </Stack>

            {/* UploadImage */}
            <Box>
              <UploadImage image={image} setImage={setImage} />
            </Box>

            {/* Detail */}
            <div>
              <h2 className="pb-2 text-[1.1rem] font-bold">Detail</h2>
              <Stack direction={{xs:"column", sm:"row"}} spacing={2}>
                {/* DIMENSIONS */}
                <Stack>
                  <ColumnInput
                    label="Dimensions"
                    placeholder="e.g. 24 x 36 inches"
                    name="dimensions"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    fontWeight="700"
                  />
                  {error.dimensions && (
                    <p className="text-red-500">{error.dimensions}</p>
                  )}
                </Stack>
                {/* MATERIAL */}
                <Stack>
                  <ColumnInput
                    label="Material"
                    placeholder="e.g. Oil on canvas"
                    name="material"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    fontWeight="700"
                  />
                  {error.material && (
                    <p className="text-red-500">{error.material}</p>
                  )}
                </Stack>
                {/* YEAR CREATED */}
                <Stack>
                  <ColumnInput
                    label="Year Created"
                    placeholder="YYYY"
                    name="yearCreated"
                    value={yearCreated}
                    onChange={(e) => setYearCreated(e.target.value)}
                    fontWeight="700"
                  />
                  {error.yearCreated && (
                    <p className="text-red-500">{error.yearCreated}</p>
                  )}
                </Stack>
              </Stack>
            </div>

            {/* CATEGORY TAGS */}
            <div>
              <h2 className="pb-3 text-[1.1rem] font-bold">Tags</h2>
              <TagSeller
                onChange={(e, newValue) => setTags(newValue)}
                value={tags}
                width='100%'
              />
              {error.tags && <p className="text-red-500">{error.tags}</p>}
            </div>

            {/* -------CHOOSE FIXED PRICE OR AUCTION------ */}
            <div className="buttonToggle">
              <ButtonTogglePostPage
                label1="fixed price"
                label2="auction"
                onClick1={diasableAuction}
                onClick2={showAuction}
                toggleValue={toggleValue}
              />
            </div>

            <div className="bg-[#f8e4d4c5] p-6 rounded-lg">
              {/* Fixed Price */}
              <div
                className={`duration-700 ${auction ? "scale-95 opacity-0" : "scale-100 opacity-100"
                  }`}
              >
                {!auction && (
                  // FIXED PRICE
                  <ColumnInput
                    type="number"
                    label="Price ($)"
                    placeholder="0.00"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fontWeight="700"
                  />
                )}
                {!auction && error.price && (
                  <p className="text-red-500">{error.price}</p>
                )}
              </div>
              {/* Auction Block */}
              <div
                className={`duration-700 ${auction ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  }`}
              >
                {auction && (
                  <Stack spacing={4}>
                    <div>
                      <h2 className="pb-3 text-[1.3rem] font-bold">Auction</h2>
                      <hr />
                    </div>
                    <div>
                      {/* MIN BID PRICE */}
                      <ColumnInput
                        type="number"
                        label="Minimum Bid Price ($)"
                        placeholder="0.00"
                        name="minBidPrice"
                        value={minBidPrice}
                        onChange={(e) => setMinBidPrice(e.target.value)}
                        fontWeight="700"
                      />
                      {auction && error.minBidPrice && (
                        <p className="text-red-500">{error.minBidPrice}</p>
                      )}
                      <p className="text-[0.9rem]">
                        Starting price for bidders
                      </p>
                    </div>
                    {/* AUCTION DURATION (TIME)*/}
                    <div>
                      <h3 className="pb-2 text-[1rem] font-[700]">
                        Auction Duration
                      </h3>
                      {/* DAYS */}
                      <Stack direction={{xs: "column", sm:"row"}} spacing={2}>
                        <Stack>
                          <ColumnInput
                            label="Days"
                            placeholder="0"
                            name="days"
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                          />

                          {auction && error.days && (
                            <p className="text-red-500">{error.days}</p>
                          )}
                        </Stack>
                        {/* HOURS */}
                        <Stack>
                          <ColumnInput
                            label="Hours"
                            placeholder="0"
                            name="hours"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                          />
                          {auction && error.hours && (
                            <p className="text-red-500">{error.hours}</p>
                          )}
                        </Stack>
                        {/* MINUTE */}
                        <Stack>
                          <ColumnInput
                            label="Minute"
                            placeholder="0"
                            name="min"
                            value={min}
                            onChange={(e) => setMin(e.target.value)}
                          />
                          {auction && error.min && (
                            <p className="text-red-500">{error.min}</p>
                          )}
                        </Stack>
                      </Stack>
                      <p className="text-[0.9rem]">Maximum duration: 7 days</p>
                    </div>
                  </Stack>
                )}
              </div>
            </div>
            {/* ----- Submit Button ------- */}
            <Stack
              direction={{xs: "column", sm:"row"}}
              spacing={{xs: 1, sm:2}}
              sx={{ justifyContent: "center" }}
            >
              <ButtonSubmit label="Preview Post" value="preview" px="48px" />
              {!editMode && (
                <ButtonSubmit label="Post Artwork" value="post" px="48px" />
              )}
              {editMode && (
                <ButtonSubmit label="Update detail" value="update" px="48px" />
              )}
            </Stack>
          </div>
          {/* ----- PREVIEW CARD ------- */}
          {preview && (
            <div className="absolute left-0 top-0 flex flex-col items-center gap-4 p-10 w-full h-full bg-[#00000053] rounded-lg backdrop-blur z-10 ">
              <PreviewCard
                title={title}
                artist={artist}
                price={price}
                auction={auction}
                minBidPrice={minBidPrice}
                image={image}
                days={days}
                hours={hours}
                min={min}
                dimensions={dimensions}
                material={material}
                yearCreated={yearCreated}
                tags={tags}
                description={description}
              />

              {/* Close Button */}
              <Stack
                onClick={() => {
                  setPreview(false);
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                  });
                }}
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  zIndex: 20,
                  backgroundColor: "primary.text",
                  borderRadius: "50%",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    color: "primary.text",
                  },
                }}
              >
                <IconButton
                  aria-label="delete"
                  sx={{
                    color: "primary.dark",
                    "&:hover": {
                      color: "primary.text",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Stack>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
