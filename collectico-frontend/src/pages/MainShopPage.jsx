import React from "react";
import Hero from "../components/Hero";
import Stack from "@mui/material/Stack";
import CollectionCard from "../components/CollectionCard";
import { Box } from "@mui/material";

function MainShopPage() {
  return (
    <div>
      <Hero />
      <section className="w-screen  bg-[#f0e0d0]">
        <div className="container mx-auto px-10 md:px-8 py-8 md:py-8 ">
          <Stack
            direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
            spacing={{ xs: 2, sm: 2, md: 4 }}
          >
            <CollectionCard
              widthPerCent={{ xs: "100%", sm: "100%", md: "500%", lg: "500%" }}
              minHeightImage={{
                xs: "200px",
                sm: "300px",
                md: "380px",
                lg: "380px",
              }}
              image1="./productPicture/Portrait-Painting-Classic-Art-1.jpg"
              name="Portait Painting"
              linkURL="/shoppage?genre=Portrait"
            />
            <CollectionCard
              widthPerCent={{ xs: "100%", sm: "100%", md: "500%", lg: "500%" }}
              minHeightImage={{
                xs: "310px",
                sm: "300px",
                md: "380px",
                lg: "380px",
              }}
              image1="./productPicture/Landscape-Painting-Modern-Art-5.jpg"
              name="Landscape Painting"
              linkURL="/shoppage?genre=Landscape"
            />
            <CollectionCard
              widthPerCent={{ xs: "100%", sm: "100%", md: "500%", lg: "500%" }}
              minHeightImage={{
                xs: "280px",
                sm: "300px",
                md: "380px",
                lg: "380px",
              }}
              image1="./productPicture/Genre-Painting-Classic-Art-5.jpg"
              name="Genre Painting"
              linkURL="/shoppage?genre=Genre"
            />
            <CollectionCard
              widthPerCent={{ xs: "100%", sm: "100%", md: "500%", lg: "500%" }}
              minHeightImage={{
                xs: "240px",
                sm: "300px",
                md: "380px",
                lg: "380px",
              }}
              image1="./productPicture/Abstract-Painting-Modern-Art-5.jpg"
              name="Abstract Painting"
              linkURL="/shoppage?genre=Abstract"
            />
            <CollectionCard
              widthPerCent={{ xs: "100%", sm: "100%", md: "500%", lg: "500%" }}
              minHeightImage={{
                xs: "300px",
                sm: "300px",
                md: "380px",
                lg: "380px",
              }}
              image1="./productPicture/Historical-Painting-Classic-Art-2.jpg"
              name="Historical Painting"
              linkURL="/shoppage?genre=Historical"
            />
          </Stack>
        </div>
      </section>

      <section className="w-screen  bg-[#f2eee7]">
        <div className="container mx-auto px-10 md:px-8 lg:px-20 2xl:px-52 py-8 md:py-8 ">
          <Stack
            direction={{ xs: "column", sm: "row", md: "row" }}
            spacing={{ xs: 2, sm: 2, md: 4 }}
          >
            <CollectionCard
              widthPerCent={{ xs: "100%", sm: "100%", md: "500%", lg: "500%" }}
              minHeightImage={{
                xs: "300px",
                sm: "300px",
                md: "380px",
                lg: "380px",
              }}
              image1="./productPicture/Genre-Painting-Classic-Art-3.jpg"
              name="Classic"
              linkURL="/shoppage?genre=Classic"
            />
            <CollectionCard
              widthPerCent={{ xs: "100%", sm: "100%", md: "500%", lg: "500%" }}
              minHeightImage={{
                xs: "300px",
                sm: "300px",
                md: "380px",
                lg: "380px",
              }}
              image1="./productPicture/Genre-Painting-Modern-Art-3.jpg"
              name="Modern"
              linkURL="/shoppage?genre=Modern"
            />
            <CollectionCard
              widthPerCent={{ xs: "100%", sm: "100%", md: "500%", lg: "500%" }}
              minHeightImage={{
                xs: "300px",
                sm: "300px",
                md: "380px",
                lg: "380px",
              }}
              image1="./productPicture/Landscape-Painting-Contemporary-Art-4.jpg"
              name="Contemporary"
              linkURL="/shoppage?genre=Contemporary"
            />
          </Stack>
        </div>
      </section>
    </div>
  );
}

export default MainShopPage;
