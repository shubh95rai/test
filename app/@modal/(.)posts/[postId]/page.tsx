import Modal from "@/components/Modal";
import SinglePostContent from "@/components/SinglePostContent";

type Params = Promise<{ postId: string }>;

export default async function SinglePostModal({ params }: { params: Params }) {
  const { postId } = await params;

  return (
    <Modal>
      <SinglePostContent postId={postId} />
    </Modal>
  );
}
