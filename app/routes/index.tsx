export default function Index() {
  return (
    <div className="px-5 mx-auto prose lg:prose-lg dark:prose-invert md:px-0 pt-14">
      <article>
        <h1>Remix App with Dark Mode</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          cum enim voluptas facilis ab ullam. Doloribus iusto asperiores
          distinctio. Quis totam accusamus aspernatur nihil voluptatem sit
          sapiente placeat dolore quaerat.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          maxime ipsum nobis dolore ut assumenda eum architecto. Vitae, sequi
          asperiores.
        </p>
      </article>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
          </tr>
          <tr>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
