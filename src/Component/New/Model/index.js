import Batch from "./Batch";
import Chapter from "./Chapter";
import Folder from "./Folder";
import ConceptCard from './ConceptCard';
import QuestionCard from './QuestionCard';

export default function Model () {
  return (
    <>
      <Chapter />
      <Folder />
      <Batch />
      <ConceptCard />
      <QuestionCard />
    </>
  )
}