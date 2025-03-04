<>
  <div
    className="formatted-text"
    dangerouslySetInnerHTML={{
      __html: formatJobPosting(String(msg.message || "")),
    }}
  />

  {Array.isArray(msg.content) && msg.content.length > 0 && (
    <div className="carousel w-full">
      {msg.content.map((slide, index) => (
        <div key={index} id={`item${index + 1}`} className="carousel-item w-full p-4">
          <div className="border rounded-lg shadow-sm bg-white p-6 w-full">
            <h3 className="text-lg font-semibold text-gray-900">{slide.title}</h3>
            <p className="mt-2 text-gray-700 whitespace-pre-line">{slide.content}</p>

            {/* Display Testimonials if available */}
            {slide.testimonials && slide.testimonials.length > 0 && (
              <div className="mt-3">
                <h4 className="text-md font-semibold text-gray-800">Testimonials:</h4>
                <ul className="list-disc list-inside mt-1 text-gray-600">
                  {slide.testimonials.map((testimonial, i) => (
                    <li key={i}>{testimonial}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )}

  {/* Navigation buttons */}
  {Array.isArray(msg.content) && msg.content.length > 0 && (
    <div className="flex w-full justify-center gap-2 py-2">
      {msg.content.map((_, index) => (
        <a key={index} href={`#item${index + 1}`} className="btn btn-xs">
          {index + 1}
        </a>
      ))}
    </div>
  )}
</>
