// assets/js/script.js

// 1. Dữ liệu các bộ phim
const moviesData = [
    {
        mainTitle: "GODZILLA",
        subTitle: "KING OF THE MONSTERS",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
        backgroundImage: "./assets/img/banner_godzilla.png",
        ratingImage: "./assets/img/Group 2.svg"
    },
    {
        mainTitle: "AVATAR",
        subTitle: "THE WAY OF WATER",
        description: "Set more than a decade after the events of the first film, 'Avatar: The Way of Water' begins to tell the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
        backgroundImage: "./assets/img/movie_avatar.jpg", // Thay đổi đường dẫn ảnh của Avatar
        ratingImage: "./assets/img/Group 2.svg" // Ảnh rating của Avatar
    },
    {
        mainTitle: "DUNE",
        subTitle: "PART TWO",
        description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
        backgroundImage: "./assets/img/movie_dune.jpg", // Thay đổi đường dẫn ảnh của Dune
        ratingImage: "./assets/img/Group 2.svg" // Ảnh rating của Dune
    },
    {
        mainTitle: "JOHN WICK",
        subTitle: "CHAPTER 4",
        description: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
        backgroundImage: "./assets/img/movie_johnwick.jpg", // Thay đổi đường dẫn ảnh của John Wick
        ratingImage: "./assets/img/Group 2.svg" // Ảnh rating của John Wick
    },
    {
        mainTitle: "SPIDER-MAN",
        subTitle: "ACROSS THE SPIDER-VERSE",
        description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must redefine what it means to be a hero so he can save the people he loves.",
        backgroundImage: "./assets/img/movie_spiderman.jpg", // Thay đổi đường dẫn ảnh của Spiderman
        ratingImage: "./assets/img/Group 2.svg" // Ảnh rating của Spiderman
    },
    {
        mainTitle: "OPPENHEIMER",
        subTitle: "THE FATHER OF ATOMIC BOMB",
        description: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
        backgroundImage: "./assets/img/movie_oppenheimer.jpg", // Thay đổi đường dẫn ảnh của Oppenheimer
        ratingImage: "./assets/img/Group 2.svg" // Ảnh rating của Oppenheimer
    }
];

// 2. Lấy các phần tử cần cập nhật
const mainContainer = document.getElementById('mainContainer');
const heroTitleMain = document.getElementById('heroTitleMain');
const heroTitleSub = document.getElementById('heroTitleSub');
const heroDescription = document.getElementById('heroDescription');
const heroRatingImg = document.getElementById('heroRatingImg');
const movieItems = document.querySelectorAll('.movie-item');

// 3. Hàm cập nhật thông tin Hero Section
function updateHeroSection(movieIndex) {
    const movie = moviesData[movieIndex];

    // Cập nhật background
    mainContainer.style.backgroundImage = `url(${movie.backgroundImage})`;

    // Cập nhật tiêu đề chính
    heroTitleMain.textContent = movie.mainTitle;

    // Cập nhật tiêu đề phụ (giữ lại span.highlight-ofthe nếu có)
    // Tách phần highlight "OF THE" nếu nó luôn có
    let subTitleHtml = movie.subTitle;
    if (subTitleHtml.includes("OF THE")) {
        subTitleHtml = subTitleHtml.replace("OF THE", "<span class='highlight-ofthe'>OF THE</span>");
    }
    heroTitleSub.innerHTML = subTitleHtml;

    // Cập nhật mô tả
    heroDescription.textContent = movie.description;

    // Cập nhật ảnh rating
    heroRatingImg.src = movie.ratingImage;
}

// 4. Gán sự kiện click cho mỗi movie-item
movieItems.forEach(item => {
    item.addEventListener('click', () => {
        const index = parseInt(item.dataset.index); // Lấy data-index
        updateHeroSection(index); // Gọi hàm cập nhật
    });
});

// (Tùy chọn) Gọi hàm cập nhật lần đầu để đảm bảo nội dung ban đầu khớp với dữ liệu
// updateHeroSection(0); // Hiển thị phim đầu tiên khi tải trang