import style from './NannyCard.module.css'
import { IoLocation, IoStar, IoHeart } from "react-icons/io5";
import calculateAge from '../../utils/calculateAge';
import { capitalizeArray } from '../../utils/capitalizeArray.js';
import { useState, useEffect } from 'react';
import NannyModal from '../NannyModal/NannyModal';

export default function NannyCard({ nanny }) {
    const [showReviews, setShowReviews] = useState(false);
    const [showModal, setShowModal] = useState(false);

    if (!nanny) return null;

    const age = nanny.birthday ? calculateAge(nanny.birthday) : 'N/A';

    const handleShowReviews = () => {
        setShowReviews(true);
    };

    const handleNannyClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // ESC tuşu ile modal kapanması
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape' && showModal) {
                handleCloseModal();
            }
        };

        if (showModal) {
            document.addEventListener('keydown', handleEscKey);
            // Body scroll'unu engelle
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            // Body scroll'unu geri aç
            document.body.style.overflow = 'unset';
        };
    }, [showModal]);

    return (
        <div className={style.cardWrapper}>
            <div className={style.card}>
                {/* Card Image */}
                <div className={style.card_imageWrapper}>
                    <img className={style.card_image} src={nanny.avatar_url} alt='nanny picture' />
                </div>

                {/* Card Content */}
                <div className={style.card_content}>
                    {/* Header */}
                    <div className={style.card_header}>
                        <div className={style.card_titleSection}>
                            <p className={style.card_role}>Nanny</p>
                            <h3 className={style.card_name}>{nanny.name}</h3>
                        </div>
                        <div className={style.card_stats}>
                            <div className={style.card_statItem}>
                                <p className={style.card_statText}><span><IoLocation className={style.statLocationIcon} /></span>{nanny.location}</p>
                            </div>
                            <div className={style.card_statItem}>
                                <p className={style.card_statText}><span><IoStar className={style.statRatingIcon} /></span>{nanny.rating}</p>
                            </div>
                            <div className={style.card_statItem}>
                                <p className={style.card_statText}>Price / 1 hour: <span className={style.card_statPrice}>{nanny.price_per_hour} $</span></p>
                            </div>
                        </div>
                        <div className={style.card_favorite}>
                            <span><IoHeart className={style.statFavoriteIcon} /></span>
                        </div>
                    </div>

                    {/* Details */}
                    <div className={style.card_details}>
                        <p className={style.card_details_item}><span className={style.card_details_label}>Age:</span>{age}</p>
                        <p className={style.card_details_item}><span className={style.card_details_label}>Experience:</span>{nanny.experience}</p>
                        <p className={style.card_details_item}><span className={style.card_details_label}>Kids Age:</span>{nanny.kids_age}</p>
                        <p className={style.card_details_item}><span className={style.card_details_label}>Characters:</span>{Array.isArray(nanny.characters) ? capitalizeArray(nanny.characters) : ''}</p>
                        <p className={style.card_details_item}><span className={style.card_details_label}>Education:</span>{nanny.education}</p>
                    </div>

                    {/* About */}
                    <div className={style.card_about}>
                        <p>{nanny.about}</p>
                    </div>

                    {/* Reviews / Show Reviews Button */}
                    {!showReviews && nanny.reviews.length > 0 && (
                        <button className={style.readMoreButton} onClick={handleShowReviews}>Read More</button>
                    )}

                    {showReviews && (
                        <div className={style.card_reviewsWrapper}>
                            <div className={`${style.card_reviews} ${showReviews ? style.show : ''}`}>
                                {Array.isArray(nanny.reviews) && nanny.reviews.map((review, index) => (
                                    <div
                                        key={review.id ? review.id : `${review.reviewer}-${index}`}
                                        className={style.card_reviewItem}
                                    >
                                        <div className={style.card_reviewerInfo}>
                                            <div className={style.card_reviewerAvatar}>
                                                {review.reviewer && review.reviewer.charAt(0).toUpperCase()}
                                            </div>
                                            <div className={style.card_reviewerDetails}>
                                                <h4 className={style.card_reviewerName}>{review.reviewer}</h4>
                                                <p className={style.card_reviewerRating}><span><IoStar className={style.card_starIcon} /></span>{review.rating}</p>
                                            </div>
                                        </div>
                                        <div className={style.card_reviewTextWrapper}>
                                            <p className={style.card_reviewText}>{review.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Make an appointment button */}
                            <div className={style.card_action}>
                                <button className={style.makeAppointmentButton} onClick={handleNannyClick}>Make an appointment</button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            
            {/* Modal */}
            {showModal && (
                <div className={style.modalOverlay} onClick={handleCloseModal}>
                    <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={style.closeButton} onClick={handleCloseModal}>×</button>
                        <NannyModal nanny={nanny} onClose={handleCloseModal} />
                    </div>
                </div>
            )}
        </div>
    );
}
