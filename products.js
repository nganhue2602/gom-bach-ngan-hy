const PRODUCTS = [
  {
    id:'BNH-001', slug:'coc-penguin-giang-sinh', name:'Cốc Penguin Giáng Sinh',
    price:179000, category:'giang-sinh', featured:true, badge:'Best seller',
    image:'assets/media/products/penguin-lifestyle.jpg',
    gallery:['assets/media/products/penguin-lifestyle.jpg','assets/media/products/penguin-trio.jpg','assets/media/products/christmas-group.jpg'],
    short:'Chiếc cốc gốm dễ thương cho mùa lễ hội và những buổi trà nóng.',
    detail:'Thiết kế hình chim cánh cụt với khăn quàng đỏ, phù hợp dùng hằng ngày hoặc làm quà tặng mùa đông.'
  },
  {
    id:'BNH-002', slug:'bo-ly-penguin', name:'Bộ ly Penguin',
    price:349000, category:'giang-sinh', featured:true, badge:'Mới',
    image:'assets/media/products/penguin-trio.jpg',
    gallery:['assets/media/products/penguin-trio.jpg','assets/media/products/christmas-group.jpg'],
    short:'Bộ ly đồng điệu cho bàn ăn hoặc góc decor Noel.',
    detail:'Phối hợp nhiều kích cỡ ly cùng họa tiết chim cánh cụt mang cảm giác ấm áp, vui mắt.'
  },
  {
    id:'BNH-003', slug:'bo-suu-tap-noel', name:'Bộ sưu tập Noel ấm áp',
    price:699000, category:'giang-sinh', featured:true, badge:'Bộ sưu tập',
    image:'assets/media/products/hero-christmas.jpg',
    gallery:['assets/media/products/hero-christmas.jpg','assets/media/products/christmas-group.jpg','assets/media/products/mugs-stack.jpg'],
    short:'Set gốm trang trí và dùng bàn ăn mang không khí Giáng sinh.',
    detail:'Gồm nhiều món phối cùng tông đỏ – kem, phù hợp bày bàn ăn, decor kệ bếp hoặc tặng quà.'
  },
  {
    id:'BNH-004', slug:'bo-dia-meo-sua', name:'Bộ đĩa Mèo Sữa',
    price:229000, category:'meo-xinh', featured:true, badge:'Yêu thích',
    image:'assets/media/products/cat_1_3.jpg',
    gallery:['assets/media/products/cat_1_3.jpg','assets/media/products/cat_1_2.jpg','assets/media/products/cat_1_1.jpg'],
    short:'Bộ đĩa hình mèo tông kem – cam dễ thương.',
    detail:'Thiết kế đáng yêu, hợp làm quà tặng hoặc dùng cho bánh trái, đồ ăn nhẹ.'
  },
  {
    id:'BNH-005', slug:'set-meo-xinh', name:'Set Mèo Xinh',
    price:319000, category:'meo-xinh', featured:false, badge:'Quà tặng',
    image:'assets/media/products/cat_1_2.jpg',
    gallery:['assets/media/products/cat_1_2.jpg','assets/media/products/cat_1_1.jpg','assets/media/products/cat_1_3.jpg'],
    short:'Set phối nhiều món mèo xinh xắn, nhẹ nhàng.',
    detail:'Phù hợp cho người yêu đồ gốm đáng yêu, phong cách trẻ trung và mềm mại.'
  },
  {
    id:'BNH-006', slug:'coc-hoa-co-xanh', name:'Cốc Hoa Cỏ Xanh',
    price:149000, category:'ban-an-hang-ngay', featured:false, badge:'Hằng ngày',
    image:'assets/media/products/gridA_1_1.jpg',
    gallery:['assets/media/products/gridA_1_1.jpg','assets/media/products/gridA_1_2.jpg','assets/media/products/gridA_1_4.jpg'],
    short:'Chiếc cốc nền kem điểm hoa xanh, dịu và dễ phối.',
    detail:'Thích hợp cho trà, cà phê hoặc làm điểm nhấn nhẹ cho không gian bàn ăn.'
  },
  {
    id:'BNH-007', slug:'bo-ban-an-gingham-xanh', name:'Bộ bàn ăn Gingham Xanh',
    price:499000, category:'ban-an-hang-ngay', featured:true, badge:'Nổi bật',
    image:'assets/media/products/gridA_1_2.jpg',
    gallery:['assets/media/products/gridA_1_2.jpg','assets/media/products/gridA_1_3.jpg','assets/media/products/gridA_1_4.jpg'],
    short:'Bộ đĩa, ly và khay mang cảm hứng khăn bàn xanh trắng.',
    detail:'Tông xanh lá nhẹ nhàng, phù hợp sử dụng mỗi ngày và trang trí bàn ăn theo phong cách vintage.'
  },
  {
    id:'BNH-008', slug:'to-quai-hoa-nhi', name:'Tô Quai Hoa Nhí',
    price:189000, category:'ban-an-hang-ngay', featured:false, badge:'Thực dụng',
    image:'assets/media/products/gridA_2_2.jpg',
    gallery:['assets/media/products/gridA_2_2.jpg','assets/media/products/gridA_2_3.jpg'],
    short:'Tô có quai, họa tiết hoa nhỏ nhẹ nhàng.',
    detail:'Phù hợp dùng cho món nước, trái cây, salad hoặc decor bàn ăn.'
  },
  {
    id:'BNH-009', slug:'set-vang-bo', name:'Set Vàng Bơ',
    price:329000, category:'ban-an-hang-ngay', featured:true, badge:'Phối bàn ăn',
    image:'assets/media/products/gridB_1_4.jpg',
    gallery:['assets/media/products/gridB_1_4.jpg','assets/media/products/gridB_1_5.jpg','assets/media/products/gridB_2_2.jpg'],
    short:'Set cốc – đĩa vàng bơ tươi sáng, trẻ trung.',
    detail:'Thiết kế sinh động nhưng vẫn thanh lịch, phù hợp bữa sáng và các set chụp ảnh sản phẩm.'
  },
  {
    id:'BNH-010', slug:'set-tra-do-ke', name:'Set trà Đỏ Kẻ',
    price:359000, category:'qua-tang', featured:false, badge:'Gift pick',
    image:'assets/media/products/gridB_2_3.jpg',
    gallery:['assets/media/products/gridB_2_3.jpg','assets/media/products/gridB_2_4.jpg','assets/media/products/gridB_2_5.jpg'],
    short:'Set trà nhỏ phối đỏ – kem nổi bật.',
    detail:'Dễ dùng cho dịp tặng quà, tân gia hoặc bày trên kệ với phong cách ấm áp.'
  },
  {
    id:'BNH-011', slug:'coc-hoa-do-may-man', name:'Cốc Hoa Đỏ May Mắn',
    price:169000, category:'qua-tang', featured:true, badge:'Quà tặng',
    image:'assets/media/products/gridB_3_1.jpg',
    gallery:['assets/media/products/gridB_3_1.jpg','assets/media/products/gridB_3_2.jpg'],
    short:'Cốc đỏ nổi bật, phù hợp làm quà và chụp set concept lễ hội.',
    detail:'Họa tiết hoa đỏ bắt mắt, tạo cảm giác ấm áp và vui tươi.'
  },
  {
    id:'BNH-012', slug:'binh-gom-xanh-bien', name:'Bình gốm Xanh Biển',
    price:289000, category:'qua-tang', featured:false, badge:'Trang trí',
    image:'assets/media/products/gridB_3_4.jpg',
    gallery:['assets/media/products/gridB_3_4.jpg'],
    short:'Bộ bình gốm xanh họa tiết cá, hợp làm quà trang trí.',
    detail:'Dành cho khách thích phong cách thủ công truyền thống, nhẹ nhàng và gần gũi.'
  }
];

const CATEGORIES = [
  { id:'all', name:'Tất cả' },
  { id:'giang-sinh', name:'Giáng sinh' },
  { id:'meo-xinh', name:'Mèo xinh' },
  { id:'ban-an-hang-ngay', name:'Bàn ăn hằng ngày' },
  { id:'qua-tang', name:'Quà tặng' }
];
