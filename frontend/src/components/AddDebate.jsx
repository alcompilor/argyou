import { addDebate } from "@/services/addDebate";
import { IconPlus } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { FileInput, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddDebate = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    const titleInputRef = useRef(null);
    const [formData, setFormData] = useState({
        title: "",
        startTime: "",
        endTime: "",
        questions: {
            q1: "",
            q2: "",
            q3: "",
        },
        thumbnail: "",
    });

    const { mutate, error, isSuccess } = useMutation({ mutationFn: addDebate });

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append("title", formData.title);
        data.append("startTime", formData.startTime);
        data.append("endTime", formData.endTime);
        data.append(
            "questions",
            Object.values(formData.questions).filter(Boolean),
        );
        if (formData.thumbnail) {
            data.append("thumbnail", formData.thumbnail);
        }
        mutate(data);
    };

    useEffect(() => {
        if (isSuccess) {
            setOpenModal(false);
            navigate(0);
        }
    }, [navigate, isSuccess]);

    return (
        <>
            <button
                className="fixed bottom-5 right-5 bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-full shadow-lg shadow-zinc-400"
                onClick={() => setOpenModal(true)}
            >
                <IconPlus size={30} />
            </button>
            <Modal
                show={openModal}
                size="md"
                popup
                onClose={() => setOpenModal(false)}
                initialFocus={titleInputRef}
            >
                <Modal.Header />
                <Modal.Body>
                    <form
                        className="space-y-4"
                        encType="multipart/form-data"
                        onSubmit={handleSubmit}
                    >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Create a new debate
                        </h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="title" value="Title" />
                            </div>
                            <TextInput
                                id="title"
                                ref={titleInputRef}
                                placeholder="e.g Is the gig economy good for workers?"
                                minLength={20}
                                required
                                onChange={(e) =>
                                    setFormData((prevObj) => ({
                                        ...prevObj,
                                        title: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="starttime"
                                    value="Start Time (UTC)"
                                />
                            </div>
                            <input
                                className="rounded-lg bg-zinc-50 border-zinc-300 text-zinc-600"
                                type="datetime-local"
                                id="starttime"
                                required
                                onChange={(e) =>
                                    setFormData((prevObj) => ({
                                        ...prevObj,
                                        startTime: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="endtime"
                                    value="End Time (UTC)"
                                />
                            </div>
                            <input
                                className="rounded-lg bg-zinc-50 border-zinc-300 text-zinc-600"
                                id="endtime"
                                type="datetime-local"
                                required
                                onChange={(e) =>
                                    setFormData((prevObj) => ({
                                        ...prevObj,
                                        endTime: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="question" value="Questions" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <TextInput
                                    id="question"
                                    required
                                    onChange={(e) =>
                                        setFormData((prevObj) => ({
                                            ...prevObj,
                                            questions: {
                                                ...prevObj.questions,
                                                q1: e.target.value,
                                            },
                                        }))
                                    }
                                />
                                <TextInput
                                    id="question"
                                    onChange={(e) =>
                                        setFormData((prevObj) => ({
                                            ...prevObj,
                                            questions: {
                                                ...prevObj.questions,
                                                q2: e.target.value,
                                            },
                                        }))
                                    }
                                />
                                <TextInput
                                    id="question"
                                    onChange={(e) =>
                                        setFormData((prevObj) => ({
                                            ...prevObj,
                                            questions: {
                                                ...prevObj.questions,
                                                q3: e.target.value,
                                            },
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="thumbnail" value="Thubmnail" />
                            </div>
                            <FileInput
                                type="file"
                                id="thumbnail"
                                accept="image/jpeg, image/png"
                                onChange={(e) =>
                                    setFormData((prevObj) => ({
                                        ...prevObj,
                                        thumbnail: e.target.files[0],
                                    }))
                                }
                            />
                        </div>
                        <div>
                            {error && (
                                <p className="text-rose-700">
                                    Something went wrong - Make sure that all
                                    fields are entered correctly
                                </p>
                            )}
                            <button
                                type="submit"
                                id="submit"
                                className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg mt-2"
                            >
                                Add debate
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};
