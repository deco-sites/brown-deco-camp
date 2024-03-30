export interface CouponProps {
  title: string;
  description: string;
  discount: number;
}

const Coupon = ({ title, description, discount }: CouponProps) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">
        <span class="text-green-500 font-bold">{discount}%</span> {description}
      </p>
    </div>
  );
};

export default Coupon;
