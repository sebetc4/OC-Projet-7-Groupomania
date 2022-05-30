import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import Divider from '@mui/material/Divider';

export default function PostFormActions({ image, videoUrl, setFile, handleDeleteImage, toggleShowVideoInput, showVideoInput, handleDeleteVideo }) {
    return (
        <div className='post-form-actions' >
            <Divider />
            <div className='post-form-actions__buttons' >
                {!videoUrl &&
                    <>
                        {!showVideoInput &&
                            <label>
                                <input
                                    title="Type search term here"
                                    accept="image/*"
                                    id='input-post-image'
                                    name='input-post-image'
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <Button
                                    variant="text"
                                    color="primary"
                                    component="span"
                                    startIcon={<PhotoCamera />}
                                >
                                    {`${image ? 'Modifier l\'' : 'Ajouter une '}image`}
                                </Button>
                            </label>
                        }
                        {image && (
                            <Button
                                color="warning"
                                startIcon={<DeleteIcon />}
                                onClick={handleDeleteImage}
                            >
                                Supprimer l'image
                            </Button>
                        )}
                    </>
                }
                {!image &&
                    <>
                        {!showVideoInput ?
                            <Button
                                variant="text"
                                color="primary"
                                component="span"
                                onClick={toggleShowVideoInput}
                                startIcon={<OndemandVideoIcon />}
                            >
                                {`${videoUrl ? 'Modifier la ' : 'Ajouter une '}video`}
                            </Button> :
                            <Button
                                variant="text"
                                color='warning'
                                onClick={toggleShowVideoInput}
                            >
                                Annuler
                            </Button>
                        }
                        {videoUrl && !showVideoInput &&
                            <Button
                                color="warning"
                                startIcon={<DeleteIcon />}
                                onClick={handleDeleteVideo}
                            >
                                Supprimer la video
                            </Button>
                        }
                    </>
                }
            </div>
            <Divider />
        </div>
    )
}