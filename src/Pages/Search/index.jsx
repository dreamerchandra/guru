import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { TileCard } from "../../Component/Card";
import api, { queryConfig } from "../../js/api";
import style from "../index.module.scss";

const findDuplicates = (arr1, arr2) => {
  let duplicates = 0;
  arr1.forEach(item => {
    if (arr2.includes(item)) {
      duplicates++;
    }
  })
  return duplicates;
}

const sortChapterBasedOnCategory = (chapters, category = []) => {
  // extracting ids from category
  const categoryId = category.map(({ id }) => id);

  // assign rank based on number of duplicates so we can sort the highest category first and lower last
  const chapterRank = chapters.map(chapter => {
    const rank = findDuplicates(chapter.category, categoryId);
    return {
      ...chapter, rank
    }
  })

  return chapterRank.sort((a, b) => a.rank - b.rank);
}


export default function Search() {
  const { search } = useParams();

  const { data: chapterData = [] } = useQuery(
    `${search}.search.chapter`,
    () => api.chapter.getBy({ search }),
    queryConfig
  );

  const { data: userData = [] } = useQuery(
    "my.user",
    api.user.getMine,
    queryConfig
  );

  const category = userData.category || [];

  const searchResult = sortChapterBasedOnCategory(chapterData, category);

  return (
    <section>
      <div className={style.toggleSwitch}></div>
      <div className="cardsHolder">
        <div className="cardHeaderWrapper">
          <h1 className="cardHeader">Search Result</h1>
        </div>
        <div className="cards fullPage">
          {searchResult.map((chapter) => (
            <TileCard
              img={chapter.titleImg}
              label={chapter.title}
              to={{
                pathname: `/chapter/${chapter.id}`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
